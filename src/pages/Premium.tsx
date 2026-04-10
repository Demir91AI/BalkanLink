import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Premium() {
  const navigate = useNavigate();
  useEffect(() => { navigate("/paketi", { replace: true }); }, [navigate]);
  return null;
}
