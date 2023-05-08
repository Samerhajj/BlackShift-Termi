import React, { useState } from "react";
import TermDiff from "../components/TermDiff";
import { diff_match_patch } from "diff-match-patch";

const TestPage = () => {
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const [diff, setDiff] = useState([]);
  const dmp = new diff_match_patch();

  const handleOldTextChange = (e) => {
    setOldText(e.target.value);
    setDiff(dmp.diff_main(e.target.value, newText));
  };

  const handleNewTextChange = (e) => {
    setNewText(e.target.value);
    setDiff(dmp.diff_main(oldText, e.target.value));
  };

  const hasDiff = diff.some((part) => part[0] !== 0);

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ marginRight: "10px" }}>
          <textarea
            value={oldText}
            onChange={handleOldTextChange}
            style={{
              width: "400px",
              height: "200px",
              border: "1px solid #ccc",
              padding: "5px",
            }}
          />
        </div>
        <div>
          <textarea
            value={newText}
            onChange={handleNewTextChange}
            style={{
              width: "400px",
              height: "200px",
              border: "1px solid #ccc",
              padding: "5px",
            }}
          />
        </div>
      </div>
      {hasDiff && (
        <div>
          <TermDiff oldTerm={oldText} newTerm={newText} />
        </div>
      )}
    </div>
  );
};

export default TestPage;
