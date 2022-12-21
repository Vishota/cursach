<?php
    interface VerifierInterface {
        function requestVerification($requestor) : bool;
        function checkVerification($requestor, $verificator) : bool;
    }