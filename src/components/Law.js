import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

function Law({ law, onSelect }) {
  return (
    <ListItemButton
      key={law.id}
      selected={law.active}
      onClick={() => onSelect(law.id)}
    >
      <ListItemText
        primary={law.name}
        primaryTypographyProps={{ fontSize: "0.8rem" }}
      />
    </ListItemButton>
  );
}

export default React.memo(Law);
