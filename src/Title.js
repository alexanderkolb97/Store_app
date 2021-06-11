import {useContext} from 'react';
import {Context} from './App';

function Title() {
    const {sortStatus, setSortstatus} = useContext(Context);

    const sortProducts = function() {
        if(sortStatus != 'desc') {
            setSortstatus('desc') 
        } else {
            setSortstatus('asc')
        }
    }

    let count = 0;

    const sliderPrevNext = function(e) {
        let dir = e.target.dataset.dir;

        const list = document.querySelector('.list');

        const items = list.querySelectorAll('.list_item');
        const itemFirst = list.querySelector('.list_item');

        const itemPaddingRight = parseInt(window.getComputedStyle(itemFirst, null).getPropertyValue('padding-right'));
        const itemPaddingLeft = parseInt(window.getComputedStyle(itemFirst, null).getPropertyValue('padding-left'));
        const itemWidth = itemFirst.offsetWidth;

        const widthTotal = itemPaddingRight + itemPaddingLeft + itemWidth;

        let addMargin = widthTotal;
        let marginLeft = 0;

        const next = () => {
            if(count == items.length - 5) return
            marginLeft = itemFirst.style.marginLeft || 0;
            marginLeft = Math.abs(parseInt(marginLeft));
            marginLeft += addMargin;
            itemFirst.style.marginLeft = `-${marginLeft}px`;
            count++;

        }

        const prev = () => {
            count--;
            marginLeft = itemFirst.style.marginLeft || 0;
            marginLeft = Math.abs(parseInt(marginLeft));
            marginLeft = marginLeft - widthTotal;
            let marginLeftPixels = '-' + marginLeft + 'px';
            itemFirst.style.marginLeft = marginLeftPixels;

        }

        if(dir == "prev") {
            prev()
        } else {
            next()
        }

    }   

    return (
        <div className="title">
            <h1>Best Sellers</h1>
            <button onClick={sortProducts} className="btn_sort">
                <span className="btn_sort_icon"></span>
            </button>
            <div className="slider_arrows">
                <button data-dir="prev" onClick={sliderPrevNext} className="arrow_left">
                    ‹
                </button>
                <button data-dir="next" onClick={sliderPrevNext} className="arrow_right">
                    ›
                </button>
            </div>
        </div>
    )
}

export default Title;