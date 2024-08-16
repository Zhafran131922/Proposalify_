import React, { useState } from 'react';
import ProposalForm from './[id]/ManualForm';
import LivePreview2 from './LivePreview2';

const ProposalPage = ({proposalId}:any) => {
  const [proposalData, setProposalData] = useState({
    judulProposal: '',
    forms: [],
  });

  const [previewData, setPreviewData] = useState({
    judulProposal: '',
    forms: [],
  });

  return (
    <div className="flex">
      <div className="w-1/2 p-8">
        <LivePreview2 formData={previewData} />
      </div>
      <div className="w-1/2 p-8">
        <ProposalForm setProposalData={setProposalData} setPreviewData={setPreviewData} proposalId={proposalId}/>
      </div>
    </div>
  );
};

export default ProposalPage;
