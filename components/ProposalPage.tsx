import React, { useState } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import ProposalForm from '../components/ProposalForm';
import LivePreview from '../components/LivePreview';

// Import components with dynamic import for server-side rendering
// const LivePreview = dynamic(() => import('../components/LivePreview'));
// const ProposalForm = dynamic(() => import('../components/ProposalForm'));

const ProposalPage = () => {
  const [proposalData, setProposalData] = useState({
    judul: '',
    latarbelakang: '',
    deskripsiusaha: '',
    penutup: '',
    lampiran: '',
  });

  // Handler to update proposal data
  const handleProposalDataChange = (fieldName, value) => {
    setProposalData({ ...proposalData, [fieldName]: value });
  };

  const [additionalData, setAdditionalData] = useState([]);
  const [additionalData2, setAdditionalData2] = useState([]);

  // Handler to submit proposal
  const handleSubmit = () => {
    // Logic to submit proposal
    // Example: Send proposalData to server or generate PDF
  };

  return (
    <div className="flex">
    <div className="w-1/2 p-8">
    <LivePreview
          proposalData={proposalData}
          uploadedImagesBackground={proposalData.uploadedImagesBackground}
          uploadedImagesDeskripsiUsaha={proposalData.uploadedImagesDeskripsiUsaha}
          additionalData={additionalData}
          additionalData2={additionalData2} // Menambahkan properti additionalData2
        />
    </div>

    <div className="w-1/2 p-8">
        <ProposalForm
          proposalData={proposalData}
          onChange={(fieldName, value) => setProposalData({ ...proposalData, [fieldName]: value })}
          onSubmit={handleSubmit}
          onAdditionalDataChange={(data) => setAdditionalData(data)}
          onAdditionalDataChange2={(data) => setAdditionalData2(data)} // Mendefinisikan onAdditionalDataChange2
        />
      </div>
      
    </div>
  );
};

export default ProposalPage;
