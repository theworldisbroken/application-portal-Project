const express = require('express')
const router = express.Router()

const ActivationService = require('./ActivationLinkService')

router.get('/:linkEnding', async (req, res) => {
    if (req) {
        try {
            const activation = await ActivationService.updateVerifiedUser(req.params.linkEnding)
            if (activation) {
                res.status(200).json({ "Success": "Gratulation! Ihr Account wurde erfolgreich aktiviert!" })
            } else {
                res.status(404).json({ "Error": "Der Link ist nicht verfügbar!" })
            }
        } catch (err) {
        }
    }
})

module.exports = router;