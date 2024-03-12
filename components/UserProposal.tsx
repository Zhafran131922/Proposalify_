import React, { useState } from 'react';

const UserProposal = () => {
  const [title, setTitle] = useState('');
  const [sections, setSections] = useState([
    { id: 1, title: '', content: '', image: null, imageComment: '' }
  ]);

  const [fontSize, setFontSize] = useState('medium');
  const [textAlign, setTextAlign] = useState('left');
  const [bold, setBold] = useState(false);
  const [underline, setUnderline] = useState(false);

  const handleFileUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedSections = sections.map(section => {
          if (section.id === id) {
            return { ...section, image: reader.result };
          }
          return section;
        });
        setSections(updatedSections);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSection = () => {
    const newSectionId = sections.length + 1;
    setSections([...sections, { id: newSectionId, title: '', content: '', image: null, imageComment: '' }]);
  };

  const handleDeleteSection = (id) => {
    setSections(sections.filter(section => section.id !== id));
  };

  const handleSectionTitleChange = (id, title) => {
    const updatedSections = sections.map(section => {
      if (section.id === id) {
        return { ...section, title };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleSectionContentChange = (id, content) => {
    const updatedSections = sections.map(section => {
      if (section.id === id) {
        return { ...section, content };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleSubmit = () => {
    // Handle submit logic here
  };

  const handleDownloadPDF = () => {
    // Handle download PDF logic here
  };

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="w-3/4 p-4">
        {/* Judul */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-b-2 border-gray-300 mb-4 outline-none"
          style={{ fontSize: `${fontSize}px`, textAlign: textAlign, fontWeight: bold ? 'bold' : 'normal', textDecoration: underline ? 'underline' : 'none' }}
          placeholder="Judul Proposal"
        />

        {/* Sections */}
        {sections.map(section => (
          <div key={section.id} className="mb-4">
            {/* Section Title */}
            <input
              type="text"
              value={section.title}
              onChange={(e) => handleSectionTitleChange(section.id, e.target.value)}
              className="border-b-2 border-gray-300 mb-2 outline-none"
              placeholder="Judul Bagian"
            />

            {/* Section Content */}
            <textarea
              value={section.content}
              onChange={(e) => handleSectionContentChange(section.id, e.target.value)}
              className="border border-gray-300 p-2 mb-2 w-full outline-none"
              placeholder="Isi Bagian"
            />

            {/* Unggah Gambar */}
            <input type="file" onChange={(e) => handleFileUpload(e, section.id)} accept="image/*" className="mb-2" />

            {/* Preview Gambar */}
            {section.image && (
              <div className="mb-2">
                <img src={section.image} alt="Preview" className="max-w-full h-auto mb-2" />
                <textarea
                  value={section.imageComment}
                  onChange={(e) => setSections(sections.map(sec => sec.id === section.id ? { ...sec, imageComment: e.target.value } : sec))}
                  className="border border-gray-300 p-2 w-full outline-none"
                  placeholder="Tambahkan Komentar"
                />
              </div>
            )}

            {/* Delete Section Button */}
            <button onClick={() => handleDeleteSection(section.id)} className="text-red-500">Hapus Bagian</button>
          </div>
        ))}

        {/* Add Section Button */}
        <button onClick={handleAddSection} className="bg-blue-500 text-white px-4 py-2 rounded">Tambah Bagian</button>
      </div>

      {/* Sidebar */}
      <div className="w-1/4 p-4">
        {/* Controls */}
        <div className="mb-4">
          <label>Ukuran Font:</label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="border border-gray-300 p-1 ml-2"
          >
            <option value="small">Kecil</option>
            <option value="medium">Sedang</option>
            <option value="large">Besar</option>
          </select>
        </div>

        <div className="mb-4">
          <label>Warna Background:</label>
          {/* Tambahkan kontrol untuk warna background */}
        </div>

        <div className="mb-4">
          <label>Align Teks:</label>
          {/* Tambahkan kontrol untuk align teks */}
        </div>

        <div className="mb-4">
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mr-2 rounded">Submit Proposal</button>
          <button onClick={handleDownloadPDF} className="bg-green-500 text-white px-4 py-2 rounded">Unduh PDF</button>
        </div>
      </div>
    </div>
  );
};

export default UserProposal;
