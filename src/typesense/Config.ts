import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    nodes: [
      {
        host: 'localhost',
        port: 8108,
        protocol: 'http',
      },
    ],
    apiKey: 'ZPKzDdH53v0dWMC5p5k5ypqhv4Y3pQSPi1prLBt5cyEuNuKT',
  },
  additionalSearchParameters: {
    sort_by: 'name',
  },
});

const searchClient = typesenseInstantsearchAdapter.searchClient;
export default searchClient;
