import Router from "express";
import multer from 'multer';

// Required for Auth routes
import userController from "../controllers/UserController";
import authValidator from "../middleware/AuthValidator";
// Required for Incident routes
import incidentController from '../controllers/IncidentController';
import incidentValidator from '../middleware/IncidentValidator';
import isLoggedIn from '../middleware/IsLoggedIn';
import isValidType from '../middleware/IsValidType';

const router = Router();

// Auth routes
router.post("/api/v1/auth/signup", authValidator.validateSignUp, userController.signUp);
router.post("/api/v1/auth/signin", authValidator.validateSignIn, userController.signIn);

// construct file storage params
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// define file uploader
const uploader = multer({
    storage: storage,
    limits: 1024 * 1024 * 5
});

// Incident routes
router.post('/api/v1/:type', isLoggedIn, isValidType, uploader.fields([{ name: 'images', maxCount: 2 }, { name: 'videos', maxCount: 2 }]), incidentValidator.validateIncident, incidentController.createIncident);
router.get('/api/v1/:type', isLoggedIn, isValidType, incidentController.allIncidents);
router.get('/api/v1/:type/:id', isLoggedIn, isValidType, incidentController.singleIncident);
router.patch('/api/v1/:type/:id/location', isLoggedIn, isValidType, incidentValidator.validateEditLocation, incidentController.editLocation);
router.patch('/api/v1/:type/:id/comment', isLoggedIn, isValidType, incidentValidator.validateEditComment, incidentController.editComment);
router.delete('/api/v1/:type/:id', isLoggedIn, isValidType, incidentController.deleteIncident);

export default router;