const { 
    ApolloServer, 
    gql 
} = require("apollo-server");

const typeDefs = gql`

    scalar Date

"""
Un objeto que representa las caracteristicas de un ski-day
"""
    type SkyDay{
        "Identificador"
        id: ID!
        "fecha"
        date: Date!
        "ubicación"
        mountain: String!
        "condiciones climaticas"
        conditions: Conditions
    }
    enum Conditions{
        CLOUDY
        POWDER
        SUNNY
        RAINNY
        HEAVY
        SNOW
        ICE
        THIN
    }
    type Query{
        diasTotales: Int!
        allDays: [SkyDay!]!
    }
    input AddDayInput{
        date: Date!
        mountain: String!
        conditions: Conditions
    }

    type RemoveDayPayload{
        day: SkyDay!
        removed: Boolean
        totalBefore: Int
        totalAfter: Int
    }

    type Mutation{
        removeDay(id: ID!): RemoveDayPayload!
        addDay(input: AddDayInput!): SkyDay
    }
`;

const resolvers = {

};

const mocks = {
    Date: () => "01/02/2024",
    String: () => "La montaña",
    Query: () => ({
        allDays: () => [...new Array(6)]
    })
};

const server = new ApolloServer({
    typeDefs,
    mocks
});

server.listen().then(({url}) => console.log(`Servidor corriendo en ${url}`));