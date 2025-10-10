import { ApiSandboxApp } from "@/components/ApiSandboxApp";
import axios from "axios";
import { useLayoutEffect, useState } from "react";

const Index = () => {
  const [loading, setLoading] = useState(false);
  async function generateToken(payload) {
    try {
      const { agent_type, ...rest } = payload;
      const response = await axios.post(
        "https://uat-cou-apiauth-idfc.plutos.one/v1/auth/token",
        {
          ...rest,
        }
      );
      localStorage.setItem(
        `access_token_${agent_type}`,
        response.data.access_token
      );
      return response.data;
    } catch (error) {
      console.error("Error generating token:", error);
      return null;
    }
  }

  useLayoutEffect(() => {
    setLoading(true);
    const scopes: string =
      "read_bills read_plans read_regions bill_validate read_operators raise_complaint get_biller_plans read_transactions get_biller_status register_complain read_agent_balance get_biller_by_region check_complain_status get_biller_categories get_biller_by_category check_complaint_status read_biller_categories bill_payment_validation get_bill_payment_txn_status read_packs read_billers read_operator_circle create_transactions";
    const payload = {
      agent_type: "int",
      clientKey: "22317b90-dc7f-45fd-b858-082be0182a4b",
      clientSecret:
        "$2b$10$FCTo.pvmWo/9NmbC2Mm5nO22o01Vygqv/Nuj/7FMtubCp6YlQCBL2",
      scopes: scopes + " get_bill_int pay_bill_int",
    };
    const payload_1 = {
      agent_type: "mob",
      clientKey: "b860fba5-da13-43f6-b8de-71598320ed4f",
      clientSecret:
        "$2b$10$72bpnWxRzYiJXmlVbjpMeOOZUHe9XoHLJchNWxuV//Q30jOJnfkf8",
      scopes: scopes + " get_bill_mob pay_bill_mob",
    };

    const payload_2 = {
      agent_type: "agt",
      clientKey: "dbb95430-d491-4e27-8f9f-f2ae8816b266",
      clientSecret:
        "$2b$10$dDr3Q9uEF/xqD11Jdq9Z8mcOO6FDrYIdXFpIkWIZLuJxCTVaXuS53",
      scopes: scopes + " get_bill_agt pay_bill_agt",
    };
    generateToken(payload);
    generateToken(payload_1);
    generateToken(payload_2);
    setLoading(false);
  }, []);

  return loading ? (
    <div className="flex items-center justify-center h-screen">
      <div className="text-gray-500">Loading...</div>
    </div>
  ) : (
    <ApiSandboxApp />
  );
};

export default Index;
