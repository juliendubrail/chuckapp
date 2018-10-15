const QuotesApi = {
    quotes: [
    {number:1 , quote: "Chcuk Rules", category: "good"},
    {number:2 , quote: "Chcuk Zbra", category: "good"},
    {number:3, quote:"Chuck is dumb", category:1}
    ],
    all: function() { return this.quotes },
    get: function(id) {
        const isQuote = q => q.category === id
        return this.quotes.find(isQuote)
    }
}

export default QuotesApi
