import {RegistrationBusinessManager} from "../businessManagers/impl/RegistrationBusinessManager";

const router = (module.exports = require('express').Router());
import container from "./../../inversify.base.config";
import TYPES from "../../types";

router.post('/', register);
router.post('/course', createFirstCourse);

// @ts-ignore
const registrationBusinessManager = container.get<RegistrationBusinessManager>(TYPES.RegistrationBusinessManager);

// remember to send the teacher whizzimo id as teacher, and the teacher stripe customer id as teacherCusID if the new user is a student
function register(req: any, res: any) {
    if(
        !req.body.firstName || !req.body.lastName
        ||!req.body.email || !req.body.password
        || !req.body.plan || !req.body.role
        || !req.body.source
    ) {
        return res.status(400).json({error: 'Request body missing required parameters.'});
    }

    registrationBusinessManager
        .register(req.body)
        .then(
            (result: any) => res.status(200).json(result),
            (error: any) => res.status(500).json(error)
        );
}

function createFirstCourse(req: any, res: any) {
    if(!req.body.firstName || !req.body.lastName || !req.body.whizzimoId) {
        return res.status(400).json({error: 'Request body missing required parameters.'});
    }

    registrationBusinessManager
        .createFirstCourse(req.body)
        .then(
            (result: any) => res.status(200).json(result),
            (error: any) => res.status(500).json(error)
        );
}
