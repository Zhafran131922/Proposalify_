import React, { useState } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic

// Import components with dynamic import for server-side rendering
const LivePreview = dynamic(() => import('../components/LivePreview'));
const ProposalForm = dynamic(() => import('../components/ProposalForm'));

const ProposalPage = () => {
  const [proposalData, setProposalData] = useState({
    title: '',
    background: '',
    conclusion: '',
  });

  // Handler to update proposal data
  const handleProposalDataChange = (fieldName, value) => {
    setProposalData({ ...proposalData, [fieldName]: value });
  };

  // Handler to submit proposal
  const handleSubmit = () => {
    // Logic to submit proposal
    // Example: Send proposalData to server or generate PDF
  };

  return (
    <div className="flex">
      <div className="w-1/2 p-8">
      <LivePreview proposalData={proposalData} uploadedImages={proposalData.uploadedImages} />

      </div>
      <div className="w-1/2 p-8">
        <ProposalForm
          proposalData={proposalData}
          onChange={handleProposalDataChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ProposalPage;
