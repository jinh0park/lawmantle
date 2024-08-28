import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "@mui/material/List";
import Law from "./Law";

function LawList({ laws, setLaws, onSelect }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLaws = async () => {
      try {
        setError(null);
        setLaws(null);
        setLoading(true);
        const response = await axios.get(
          "https://port-0-lawmantle-m0bu29sm32ce9ed1.sel4.cloudtype.app/laws"
        );
        setLaws(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchLaws();
  }, [setLaws]);

  if (loading) return <div></div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!laws) return <div>법률을 선택해주세요.</div>;

  return (
    <List>
      {laws.map((law) => (
        <Law law={law} key={law.id} onSelect={onSelect}></Law>
      ))}
    </List>
  );
}

export default React.memo(LawList);
