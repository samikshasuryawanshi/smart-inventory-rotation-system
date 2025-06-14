import Donation from '../models/Donation.js';

export const getDonations = async (req, res) => {
  const donations = await Donation.find({});
  res.json(donations);
};
