import { h } from 'preact';
import { useForm } from 'react-hook-form';
import { useEffect } from 'preact/hooks';
import { isValidHostname, slugify } from 'utils/isValidHostname';
import { useBoardData } from 'utils/queries';
import { useChangeHostname } from '../nodeAdminQueries';
import ConfigPageLayout from '../layouts/configPageLayout';
import Loading from 'components/loading';
import { Trans } from '@lingui/macro';

const HostnamePage = () => {
    const { data: boardData, isLoading } = useBoardData();
    const { register, handleSubmit, reset, setValue, errors } = useForm();
    const [changeHostname, { isLoading: isSubmitting, isSuccess, isError }] = useChangeHostname();

    useEffect(() => {
        reset({ hostname: boardData && boardData.hostname });
    }, [boardData, reset]);

    function onSubmit({ hostname }) {
        changeHostname(hostname);
    }

    return (
        <ConfigPageLayout {...{
            isLoading, isSuccess, isError,
            title: <Trans>Node Name</Trans>
        }}>
            <form class="flex-grow-1">
                <label class="d-none" htmlFor="hostname"><Trans>Node Name</Trans></label>
                <input type="text" name="hostname" id="hostname"
                    ref={register({
                        required: true,
                        validate: { validHostname: (v) => isValidHostname(v, true) }
                    })}
                    onChange={(v) => setValue("hostname", slugify(v.target.value.toLowerCase()))}
                    class="w-100" />
                {errors && errors.hostname &&
                    <p class="text-danger">
                        <Trans>The name should have at least 3 characters</Trans>
                    </p>
                }
            </form>
            <div class="d-flex">
                <div class="ml-auto">
                    {!isSubmitting &&
                        <button onClick={handleSubmit(onSubmit)} class="ml-auto" >
                            <Trans>Save</Trans>
                        </button>
                    }
                    {isSubmitting &&
                        <Loading />
                    }
                </div>
            </div>
        </ConfigPageLayout >
    )
}

export default HostnamePage;
