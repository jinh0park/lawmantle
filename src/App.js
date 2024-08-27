import React, { useState, useCallback, useRef } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LawList from "./components/LawList";
import NearLawList from "./components/NearLawList";
import Paper from "@mui/material/Paper";
import LawDetail from "./components/LawDetail";

function App() {
  const [laws, setLaws] = useState(null);
  const selectedLaw = useRef();
  const selectedNearLaw = useRef();
  const [nearLaws, setNearLaws] = useState(null);

  const onSelect = useCallback((id) => {
    setLaws((laws) =>
      laws.map((law) =>
        law.id === selectedLaw.current ? { ...law, active: false } : law
      )
    );
    setLaws((laws) =>
      laws.map((law) => (law.id === id ? { ...law, active: true } : law))
    );
    selectedLaw.current = id;
  }, []);

  const onSelectNear = useCallback((id) => {
    setNearLaws((laws) =>
      laws.map((law) =>
        law.id === selectedNearLaw.current ? { ...law, active: false } : law
      )
    );
    setNearLaws((laws) =>
      laws.map((law) => (law.id === id ? { ...law, active: true } : law))
    );
    selectedNearLaw.current = id;
  }, []);

  return (
    <Container maxWidth="xl">
      <div style={{ height: "2vh" }}></div>

      <Grid container spacing={3}>
        <Grid item md={3}>
          <Paper style={{ height: "96vh", overflow: "auto" }}>
            <LawList
              laws={laws}
              setLaws={setLaws}
              onSelect={onSelect}
            ></LawList>
          </Paper>
        </Grid>
        <Grid item md={3}>
          <Paper style={{ height: "96vh", overflow: "auto" }}>
            <NearLawList
              nearLaws={nearLaws}
              setNearLaws={setNearLaws}
              lawId={selectedLaw.current}
              onSelect={onSelectNear}
            ></NearLawList>
          </Paper>
        </Grid>
        <Grid item md={6}>
          <Paper style={{ height: "47vh", overflow: "auto" }}>
            <Container maxWidth="xl">
              <LawDetail lawId={selectedLaw.current}></LawDetail>
            </Container>
          </Paper>
          <div style={{ height: "2vh" }}></div>
          <Paper style={{ height: "47vh", overflow: "auto" }}>
            <Container maxWidth="xl">
              <LawDetail lawId={selectedNearLaw.current}></LawDetail>
            </Container>
          </Paper>
        </Grid>
      </Grid>
      <div style={{ height: "2vh" }}></div>
    </Container>
  );
}

export default App;
