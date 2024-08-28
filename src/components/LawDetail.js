import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function LawDetail({ lawId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [lawDetail, setLawDetail] = useState();

  useEffect(() => {
    const fetchLawDetail = async () => {
      try {
        setError(null);
        setLawDetail(null);
        setLoading(true);
        const response = await axios.get(
          `https://port-0-lawmantle-m0bu29sm32ce9ed1.sel4.cloudtype.app/laws/${lawId}`
        );
        setLawDetail(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchLawDetail();
  }, [setLawDetail, lawId]);

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
  if (loading) return null;
  if (error) return null;
  if (!lawDetail) return null;

  return (
    <div style={{ fontSize: "0.8rem", "& > ul": { paddingLeft: 0 } }}>
      <Container maxWidth="xl">
        <ReactMarkdown>{lawDetail.content}</ReactMarkdown>
      </Container>
    </div>
  );
}

// https://www.law.go.kr/DRF/lawService.do?OC=jinh0park&target=law&ID=1234&type=HTML

export default LawDetail;
