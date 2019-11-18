const ReformatBins = bins => {
  let bin_ids = {}
  for(const location of bins) {
    bin_ids[location.Name] = {};
    bin_ids[location.Name].name = location.Name;
    bin_ids[location.Name].bins = {};
    for(const bin of location.Bins) {
      bin_ids[location.Name].bins[bin.Name] = {};
      bin_ids[location.Name].bins[bin.Name].name = bin.Name;
      bin_ids[location.Name].bins[bin.Name].id = bin.ID;
    }
  }
  return bin_ids;
}

export default ReformatBins;