import { useState, useRef, useEffect  } from 'react';
import '../../styles/admin/MembershipPage.css';
import { membershipPriceService } from '../../service/membershipPrice.service.ts';
import type { IPlanGroup } from '../../service/membershipPrice.service.ts';
import type { Error } from "../../types/error.type";
import axios from 'axios';


function MembershipPage() {
  const [plans, setPlans] = useState<IPlanGroup[]>([]);
  const originalPlan = useRef<IPlanGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Error | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadPrices = async () => {
        try {
            setLoading(true);
            const currentPrices = await membershipPriceService.getCurrentPrices();

            const validPrices = Array.isArray(currentPrices) ? currentPrices : [];
            setPlans(validPrices);
            originalPlan.current = validPrices;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors({ error: true, message: error.response?.data.message || "Error al cargar precios" });
            } else {
                setErrors({ error: true, message: "Error desconocido" });
            }
        } finally {
            setLoading(false);
        }
    };

    loadPrices();
  }, []);

  const handlePriceChange = (id:number, newPriceString:string) => {
    const newPrice = Number(newPriceString); 
    if (isNaN(newPrice)) {
      return;
    }
    setPlans(plans.map(plan => 
      plan.id === id ? { ...plan, price: newPrice } : plan
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors(null);
      setSuccessMessage(null);
      setLoading(true);

      try {
          const changedPlans = plans.filter(plan => {
              const original = originalPlan.current.find(p => p.id === plan.id);
              return !original || original.price !== plan.price;
          });

          if (changedPlans.length === 0) {
              setSuccessMessage("No hay cambios que guardar.");
              setLoading(false);
              return;
          }

          const updatePromises = changedPlans.map(plan =>
              membershipPriceService.updatePriceForGroup(plan.id, plan.price)
          );

          await Promise.all(updatePromises);

          setSuccessMessage("Precios actualizados con éxito");
          originalPlan.current = [...plans];

      } catch (error) {
          if (axios.isAxiosError(error)) {
              setErrors({ error: true, message: error.response?.data.message || "Error al guardar cambios" });
          } else {
              setErrors({ error: true, message: "Error desconocido al guardar" });
          }
      } finally {
          setLoading(false);
      }
    };
  
  return (
    <>
    <div id="top" className="page-background">
      <div className="membresias-window">
        <div className="membresias-header-wrapper">
          <h1 className="membresias-header">Membresías</h1>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="membresias-grid">
          {plans.map((plan) => (
            <div key={plan.id} className="membresia-card">
              <h2>{plan.description}</h2>
              <p>Precio actual: ${originalPlan.current.find(p => p.id === plan.id)?.price}</p>
              <div className="price-container">
                <label htmlFor={`price-${plan.id}`}>Nuevo precio:  $</label>
                <input
                  id={`price-${plan.id}`}
                  type="number"
                  step="100"
                  min="0"
                  value={plan.price}
                  onChange={(e) => handlePriceChange(plan.id, e.target.value)}
                  className="price-input"
                  disabled={loading}
                />
              </div>
            </div>
          ))}
        </div>

        {loading && <div className="error-message-memb">Cargando...</div>}
          {errors?.error && (
              <div className="error-message-memb">
                  {errors.message}
              </div>
          )}
          {successMessage && (
              <div className="success-message-memb">
                  {successMessage}
              </div>
          )}


        <div className="button-cont-save-memb">
          <button type="submit" className="button-save-memb" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default MembershipPage;