import 'affiliation-merchant-addresses';

export default {
  name: 'merchant-addresses',

  template: `
    <button>top</button>
    <affiliation-merchant-addresses
      addable
      editable
      affiliationCode="">
    </affiliation-merchant-addresses>
  `,
  mounted: () => {
    const $merchantAddreses = document
      .querySelector('affiliation-merchant-addresses');
    $merchantAddreses.state.addresses = {
      data: [
        {
          affiliationCode: '192489630',
          id: 406082,
          typeId: 1,
          typeName: 'Principal - Operação',
          cityId: 4,
          cityName: 'São Paulo',
          stateName: 'SP',
          countryId: 76,
          countryName: 'Brasil',
          complement: 'ANDAR 10 CONJ 102 TORRE A',
          locatedInShopping: false,
          neighborhood: 'Vila Olímpia',
          postalCode: '04551-010',
          reference: 'Perto da Torre B e da C',
          streetName: 'Fidêncio Ramos',
          streetNumber: '310',
          streetTypeId: 34,
        },
        {
          affiliationCode: '192489630',
          id: 533539,
          typeId: 5,
          typeName: 'Instalação',
          cityId: 9036,
          cityName: 'Tarumã',
          stateName: 'SP',
          countryId: 76,
          countryName: 'Brasil',
          complement: '1234',
          locatedInShopping: false,
          neighborhood: 'add',
          postalCode: '19248963',
          reference: 'Atras do bosque',
          streetName: 'das plantas rojas',
          streetNumber: '12345',
          streetTypeId: 16,
        },
      ],
      messages: [],
    };
  },
};
