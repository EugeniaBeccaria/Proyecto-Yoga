import { useState, useRef  } from 'react';
import '../../styles/admin/MembershipPage.css';

//Hay q cambiar el diseño
//Acá hay q traer de la bdd los datos de las membresías. y dps hacer q el botón guarde los cambios en la bdd
const initialPlans =[
    { id: 1, description: 'Membresía Básica (1-2 clases por semana)', price: 4000 },
    { id: 2, description: 'Membresía tipo 1 (2-4 clases por semana)', price: 11000 },
    { id: 3, description: 'Membresía Full (4-6 clases por semana)', price: 18000 },
  ];

function MembershipPage() {
  const [plans, setPlans] = useState(initialPlans);
  const originalPlan = useRef(initialPlans);

  const handlePriceChange = (id:number, newPriceString:string) => {
    const newPrice = Number(newPriceString); 
    if (isNaN(newPrice)) {
      return;
    }
    setPlans(plans.map(plan => 
      plan.id === id ? { ...plan, price: newPrice } : plan
    ));
  };
  
  return (
    <>
    <div id="top" className="page-background">
      <div className="membresias-window">
        <div className="membresias-header-wrapper">
          <h1 className="membresias-header">Membresías</h1>
        </div>
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
                />
              </div>
            </div>
          ))}
        </div>
        <div className="button-cont-save-memb">
          <button type="submit" className="button-save-memb">
              Guardar
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default MembershipPage;