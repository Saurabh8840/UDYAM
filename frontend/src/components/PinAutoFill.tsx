import { useEffect } from "react";

interface Props {
  pinCode: string;
  onChange: (city: string, state: string) => void;
}

const PinAutoFill = ({ pinCode, onChange }: Props) => {
  useEffect(() => {
    if (pinCode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${pinCode}`)
        .then(res => res.json())
        .then(data => {
          if (data[0].Status === "Success") {
            const { District, State } = data[0].PostOffice[0];
            onChange(District, State);
          }
        })
        .catch(err => console.log("PIN API error:", err));
    }
  }, [pinCode, onChange]);

  return null;
};

export default PinAutoFill;
