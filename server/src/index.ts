import Express from 'express';
const app = Express();

app.get("/", (req, res) => {
    return res.status(200).send("hello poopy");
});

app.listen(6969, () => {
    console.log(`Listening on 6969`);
})

console.log("hello world");