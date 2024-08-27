import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

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

  if (loading) return null;
  if (error) return null;
  if (!lawDetail) return null;

  return <ReactMarkdown>{lawDetail.content}</ReactMarkdown>;
}

// https://www.law.go.kr/DRF/lawService.do?OC=jinh0park&target=law&ID=1234&type=HTML

export default LawDetail;
