import { useState, useRef  } from 'react';
import '../../styles/admin/MembershipPage.css';

const initialPlans =[
    { id: 1, name: 'TIPO A', classes: '1', price: 4000 },
    { id: 2, name: 'TIPO B', classes: '2', price: 7500 },
    { id: 3, name: 'TIPO C', classes: '3', price: 11000 },
    { id: 4, name: 'TIPO D', classes: '4', price: 14500 },
    { id: 5, name: 'TIPO E', classes: '5', price: 18000 },
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
          <h1 className="membresias-header">MEMBRESÍAS</h1>
        </div>
        <div className="membresias-grid">
          {plans.map((plan) => (
            <div key={plan.id} className="membresia-card">
              <h2>{plan.name}</h2>
              <p>Cantidad de clases: {plan.classes}</p>
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