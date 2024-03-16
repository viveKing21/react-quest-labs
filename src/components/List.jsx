import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

function Card({ card, index, listKey }) {
    const [{ isDragging }, drag] = useDrag({
        type: 'CARD',
        item: { index, listKey },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    });

    return (
        <div ref={drag} className='card' style={{ opacity: isDragging ? 0.5 : 1 }}>
            <div style={{ '--label-color': card.labelColor }} />
            <span>{card.title}</span>
            <ul>
                <li><span className="material-symbols-outlined">subject</span></li>
                <li><span className="material-symbols-outlined">chat_bubble</span></li>
            </ul>
        </div>
    );
}

export default function List({ title, data, listKey, moveCard, onAddClick }) {
    const [, drop] = useDrop({
        accept: 'CARD',
        drop: (item, monitor) => {
            moveCard(item.listKey, listKey, item.index);
        }
    });

    return (
        <div className='list' ref={drop}>
            <div>
                <h4>{title}</h4>
                <span className="material-symbols-outlined btn">more_horiz</span>
            </div>
            {data.map((card, index) => (
                <Card 
                    key={index} 
                    index={index} 
                    card={card}
                    listKey={listKey}
                />
            ))}
            <div>
                <button className='btn' onClick={onAddClick}>
                    <span className="material-symbols-outlined">add</span>
                    Add a Card
                </button>
            </div>
        </div>
    )
}
