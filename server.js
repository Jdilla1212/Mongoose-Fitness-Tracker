const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const Workout = require("./models/workout");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static("./public"));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

//HTML Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"))
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"))
});

//API Routes
app.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err)
        });
});

app.get("/api/workouts/range", (req, res) => {
    Workout.find({})
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err)
        });
});

app.post("/api/workouts", ({
    body
}, res) => {
    Workout.create(body)
        .then(dbUser => {
            res.json(dbUser)
        })
        .catch(err => {
            res.json(err)
        });
});

app.put("/api/workouts/:id", ({
    body,
    params
}, res) => {
    Workout.findByIdAndUpdate(params.id, {
            $push: {
                exercises: body
            }
        })
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err)
        });
});

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});