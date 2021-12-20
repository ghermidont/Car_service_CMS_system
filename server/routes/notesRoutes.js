//File contains endpoints for notes related requests.
const express = require( "express" );
const router = express.Router();

// middlewares
const { fireBaseAuthCheckMiddleware } = require( "../middlewares/authMiddleware" );

// controllers import
const {
    mongoDBCreateNoteController,
    mongoDBGetNotesCountController,
    mongoDBDeleteNoteController,
    mongoDBGetSingleNoteController,
    mongoDBUpdateNoteController,
    mongoDBGetAllNotesController,
    mongoDBGetNotesByFilterController
} = require( "../controllers/notesController" );

// routesController
router.post(
    "/note/new",
    fireBaseAuthCheckMiddleware,
    mongoDBCreateNoteController
);

router.delete(
    "/note/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDBDeleteNoteController
);

router.get(
    "/notes/total",
    mongoDBGetNotesCountController
);

router.get(
    "/note/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDBGetSingleNoteController
);

router.put(
    "/note/update/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDBUpdateNoteController
);

router.post(
    "/notes",
    mongoDBGetAllNotesController
);

router.post(
    "/notes/filter",
    //fireBaseAuthCheckMiddleware,
    mongoDBGetNotesByFilterController
);

module.exports = router;