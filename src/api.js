const QuotesApi = {
    quotes: [
    {id:1 , text: "Chcuk Rules", good: false},
    {id:2 , text: "Chcuk Zbra", good: true},
    {id:3, text:"Chuck is dumb", good: false}
    ],
    all: function() { return this.quotes },
    good: function() {
        return this.quotes.filter(q=> q.good)
    },
    bad: function () {
        return this.quotes.filter(q=> !q.good)
    }
}

export default QuotesApi
