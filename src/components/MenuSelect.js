import styled from 'styled-components';
import { Search, MapPin } from 'react-feather';

const MenuSelect = ({ getGeolocation, setShowSearch, showSearch }) => {
	return (
		<StyledSelect>
			<div
				className='menu__top__select'
				tabIndex='1'
				onClick={getGeolocation}
				onKeyDown={(event) => {
					if (event.key === 'Enter') {
						getGeolocation();
					}
				}}
			>
				<MapPin color='#fff' size={36} />
				<p>Location</p>
			</div>

			<div className='vl'></div>

			<div
				className='menu__top__select'
				tabIndex='2'
				onClick={() => setShowSearch(!showSearch)}
				onKeyUp={(event) => {
					if (event.key === 'Enter') {
						setShowSearch(!showSearch);
					}
				}}
			>
				<Search color='#fff' size={36} />
				<p>Search</p>
			</div>
		</StyledSelect>
	);
};

export default MenuSelect;

const StyledSelect = styled.div`
	width: 90%;
	height: 5rem;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	margin: 0 auto;

	.menu__top__select {
		display: flex;
		flex-direction: column;
		height: 100%;
		align-items: center;
		justify-content: space-around;
		cursor: pointer;
		/* text-transform: uppercase; */

		p {
			font-size: 1.2rem;
			font-weight: 700;
		}
	}

	.vl {
		border-left: 1px dashed white;
		height: 90%;
		margin: 0 2rem;
	}
`;
