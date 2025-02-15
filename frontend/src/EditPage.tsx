import { useEffect } from "react";

export default function EditPage() {
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://localhost:3000/api/admin/${"AS"}`, {
        method: "GET",
      });
    };
    fetchData();
  }, []);

  return <div>ísadad</div>;
}
