import { Trans } from "@lingui/macro";
import { route } from "preact-router";
import { useState } from "preact/hooks";

import { Banner } from "components/banner";

import { useAppContext } from "utils/app.context";

import { useDismissFbw } from "../FbwQueries";

export const FbwBanner = () => {
    const [notShowAgain, setnotShowAgain] = useState(false);
    const { mutate: dismissFbw } = useDismissFbw();
    const { cancelFbw } = useAppContext();

    function onOk() {
        route("firstbootwizard");
    }

    function onCancel() {
        if (notShowAgain) {
            dismissFbw();
        } else {
            cancelFbw();
        }
    }

    function onNotShowAgain(e) {
        setnotShowAgain(e.target.checked);
    }

    const title = <Trans>Please configure your network</Trans>;
    const description = (
        <Trans>
            Your router has not yet been configured, you can use our wizard to
            incorporate it into an existing network or create a new one. If you
            ignore this message it will continue to work with the default
            configuration.
        </Trans>
    );
    return (
        <Banner
            onOk={onOk}
            onCancel={onCancel}
            title={title}
            description={description}
            onNotShowAgain={onNotShowAgain}
        />
    );
};
