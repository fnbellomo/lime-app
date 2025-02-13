import { h } from "preact";
import { useListVouchers } from "./piraniaQueries";
import { Loading } from "components/loading";
import VoucherList from "./screens/voucherList";
const PiraniaPage = ({}) => {
	const { data, isLoading } = useListVouchers();
	if (isLoading) {
		return (
			<div class="container container-center">
				<Loading />
			</div>
		);
	}
	return <VoucherList vouchers={data} />;
};

export default PiraniaPage;
