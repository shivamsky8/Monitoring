data = data.filter(
  (thing, index, self) =>
    index ===
    self.findIndex(
      t =>
        t.record_date.substr(0, t.record_date.indexOf(" ")) ===
        thing.record_date.substr(0, thing.record_date.indexOf(" "))
    )
);
