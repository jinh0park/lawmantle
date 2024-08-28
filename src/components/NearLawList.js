import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "@mui/material/List";
import Law from "./Law";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";

function NearLawList({ nearLaws, setNearLaws, lawId, onSelect }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLaws = async () => {
      try {
        setError(null);
        setNearLaws(null);
        setLoading(true);
        const response = await axios.get(
          `https://port-0-lawmantle-m0bu29sm32ce9ed1.sel4.cloudtype.app/near/${lawId}`
        );
        setNearLaws(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchLaws();
  }, [setNearLaws, lawId]);
  if (!lawId)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100%"
      >
        법률을 선택해주세요.
      </Box>
    );
  if (loading)
    return (
      <List>
        {[].map((law) => (
          <Law law={law} key={law.id} onSelect={() => {}}></Law>
        ))}
      </List>
    );
  if (error)
    return (
      <List>
        {[].map((law) => (
          <Law law={law} key={law.id} onSelect={() => {}}></Law>
        ))}
      </List>
    );
  if (!nearLaws) return null;

  return (
    <List>
      {nearLaws.slice(0).map((law) => (
        <ListItemButton
          key={law.id}
          selected={law.active}
          onClick={() => onSelect(law.id)}
        >
          <ListItemIcon>{`${parseInt(law.score * 100)}점`}</ListItemIcon>
          <ListItemText
            primary={`${law.name}`}
            primaryTypographyProps={{ fontSize: "0.8rem" }}
          />
        </ListItemButton>
      ))}
    </List>
  );
}

export default React.memo(NearLawList);
