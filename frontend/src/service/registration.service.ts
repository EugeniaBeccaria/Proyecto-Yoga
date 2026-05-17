import axios from "axios";
import type { IPlanGroup } from "../types/class.type";
// import type { User } from "../types/user.type";
import type { SelectedClass } from "../types/class.type";

const prepareCheckoutDataClasses = async (selectedClasses: SelectedClass[], currentPlan: IPlanGroup, user: string) => {
    try{
        console.log("Preparing checkout data with:", { selectedClasses, currentPlan, user });
        const response = await axios.post('http://localhost:3000/api/payment/create-checkout-session-classes', {
            classes: selectedClasses,
            plan: currentPlan,
            user: user
        }, { withCredentials: true });
        
        return response.data;
    }
    catch(error){
        console.error("Error preparing checkout data:", error);
        throw error;
    }
}

const prepareCheckoutDataTalleres = async (talleres: unknown[], user: string) => {
    try{
        console.log("Preparing talleres checkout data with:", { talleres, user });
        const response = await axios.post('http://localhost:3000/api/payment/create-checkout-session-talleres', {
            talleres: talleres,
            user: user
        }, { withCredentials: true });

        return response.data;
    }
    catch(error){
        console.error("Error preparing talleres checkout data:", error);
        throw error;
    }
}
export const registrationService = {
    prepareCheckoutDataClasses,
    prepareCheckoutDataTalleres
};
