
const express = require('express');
const router = express.Router();
const Proposal = require('../models/Proposal');
const SubmittedProposal = require('../models/SubmittedProposal');
const proposalController = require('../controllers/proposalController');
const Dosen = require('../models/Dosen');
const sendProposalNotification = require('../services/emailService');
const { sendProposalHandler } = require('../controllers/proposalController');

const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});


const upload = multer({ storage: storage });

router.post('/upload', upload.single('gambar'), (req, res, next) => {
    const file = req.file;
    if (!file) {
      const error = new Error('Please upload a file');
      error.status = 400;
      return next(error);
    }
    res.status(201).json({ message: 'File uploaded successfully', path: file.path });
  });

  router.post('/proposals', async (req, res) => {
    try {
        const { user_id, judul, formulirs } = req.body;

        const proposal = new Proposal({
            user_id,
            judul,
            formulirs // Menggunakan formulirs langsung, karena formulirs sudah dalam bentuk array objek
        });

        await proposal.save();

        res.status(201).json({ message: 'Proposal berhasil disimpan' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/send-proposal-to-admin', async (req, res) => {
    try {
        const { proposalId, adminId } = req.body;

        const proposal = await Proposal.findById(proposalId);
        if (!proposal) {
            return res.status(404).json({ message: 'Proposal tidak ditemukan' });
        }
        proposal.admin_id = adminId;
        await proposal.save();

        const submittedProposal = new SubmittedProposal({
            proposal_id: proposal._id,
            admin_id: adminId
        });
        await submittedProposal.save();

        res.status(200).json({ message: 'Proposal berhasil dikirim ke administratorsss' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/send-proposal-to-dosen', async (req, res) => {
  try {
      const { proposal_id, dosen_email } = req.body;

      const proposal = await Proposal.findById(proposal_id);
      if (!proposal) {
          return res.status(404).json({ message: 'Proposal not found' });
      }
      const dosen = await Dosen.findOne({ email: dosen_email });
      if (!dosen) {
          return res.status(404).json({ message: 'Dosen not found' });
      }
      if (!dosen.proposals) {
          dosen.proposals = [];
      }
      dosen.proposals.push(proposal);
      await dosen.save();

      await sendProposalNotification(dosen_email);

      res.status(200).json({ message: 'Proposal sent to dosen successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.get('/saved-proposals/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;

        const savedProposals = await Proposal.find({ user_id });

        res.status(200).json(savedProposals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/submitted-proposals/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const submittedProposals = await SubmittedProposal.find({ user_id });

        res.status(200).json(submittedProposals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:proposalId', async (req, res) => {
    try {
        const proposalId = req.params.proposalId;
        const proposal = await Proposal.findById(proposalId);
        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }
        res.status(200).json(proposal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:proposalId', async (req, res) => {
    try {
        const { title, background, deskripsiUsaha, penutup, lampiran } = req.body;
        const proposalId = req.params.proposalId;

        const proposal = await Proposal.findById(proposalId);
        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }

        proposal.title = title;
        proposal.background = background;
        proposal.deskripsiUsaha = deskripsiUsaha;
        proposal.penutup = penutup;
        proposal.lampiran = lampiran;

        await proposal.save();

        res.status(200).json({ message: 'Proposal updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:proposalId', async (req, res) => {
    try {
        const proposalId = req.params.proposalId;

        const proposal = await Proposal.findById(proposalId);
        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }
        await Proposal.findByIdAndDelete(proposalId);

        res.status(200).json({ message: 'Proposal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/send-proposal', async (req, res) => {
    try {
        const { title, background, deskripsiUsaha, penutup, lampiran } = req.body;

        const proposal = new Proposal({ title, background, deskripsiUsaha, penutup, lampiran });

        await proposal.save();

        res.status(201).json({ message: 'Proposal sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/send-proposals', proposalController.sendProposal);

module.exports = router;
