import React, { useState } from 'react';
import ManualForm from './ManualForm';
import LivePreview2 from './LivePreview2';

const ProposalPage = () => {
  const [proposalData, setProposalData] = useState({
    judulProposal: '',
    latarBelakang: '',
    forms: [],
  });

  const [previewData, setPreviewData] = useState({
    judulProposal: '',
    latarBelakang: '',
    forms: [],
  });

  return (
    <div className="flex">
      <div className="w-1/2 p-8">
        {/* Menampilkan LivePreview2 dan meneruskan preview data */}
        <LivePreview2 formData={previewData} />
      </div>
      <div className="w-1/2 p-8">
        {/* Menampilkan ManualForm dan meneruskan setProposalData dan setPreviewData sebagai props */}
        <ManualForm setProposalData={setProposalData} setPreviewData={setPreviewData} />
      </div>
    </div>
  );
};

export default ProposalPage;
