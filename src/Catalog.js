import Products from './Products';
import Title from './Title';

function Catalog() {
    return (
        <>
        <Title />
        <div className="catalog">
            <Products/>
        </div>
        </>
    )
}

export default Catalog;

