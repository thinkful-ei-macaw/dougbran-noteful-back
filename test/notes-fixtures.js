function makenotesArray() {
  return [
    {
      id: 1,
      name: "first",
      modified: new Date().toISOString(),
      folderId: 5,
    },
    {
      id: 2,
      name: "second",
      modified: new Date().toISOString(),
      folderId: 4,
    },
    {
      id: 3,
      name: "third",
      modified: new Date().toISOString(),
      folderId: 3,
    },
    {
      id: 4,
      name: "fourth",
      modified: new Date().toISOString(),
      folderId: 2,
    },
    {
      id: 5,
      name: "fifth",
      modified: new Date().toISOString(),
      folderId: 1,
    },
  ];
}

module.exports = { makenotesArray };
