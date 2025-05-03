import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CInputGroup, CInputGroupText, } from "@coreui/react";
import SearchIcon from '../../../assets/images/navbar/search.png';
import Autocomplete from 'react-autocomplete';
import { useNavigate } from 'react-router-dom';
import useGlobalSearchListing from '../../../hooks/customHooks/useGlobalSearch';

export default function GlobalSearch() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const observer = useRef();
    const { searchData, hasMore, busy, setBusy, handleFetch, setSearchData } = useGlobalSearchListing(
        pageNumber,
        query
    );

    const handleChange = (e) => {
        setPageNumber(1)
        setQuery(e.target.value);
    };

    const handleSelect = (project_name) => {
        const project = searchData.find(item => item?.project_name == project_name)
        if (project?.id) navigate(`/projects/view/${project?.id}/`);
    }

    const handleResetQuery = () => {
        setQuery('');
        setSearchData([])
    }

    const lastElRef = useCallback(
        (node) => {
            if (busy) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0]?.isIntersecting && hasMore) setPageNumber((c) => c + 1);
            });
            if (node) observer.current.observe(node);
            return _ => observer.current.disconnect()
        },
        [busy, hasMore]
    );


    const getIndex = (item) => searchData?.indexOf(item)
    const getItemValue = item => item.project_name;
    const renderItem = (item, highlighted) => (
        getIndex(item) + 1 == searchData.length ?
            <div className='project-drop' key={item.id} style={{ padding: '10px', backgroundColor: highlighted ? '#eee' : 'transparent' }}>
                <h2>{item.project_name}</h2>
                {item?.id &&
                    <>
                        <div className='project-sub d-block' ref={lastElRef} >
                            <div className='project-li w-100'><p>Customer:</p><h2>{item.customer}</h2></div>
                        </div>
                        <div className='project-sub'>
                            <div className='project-li'><p>Project Code:</p><h2>{item.project_code}</h2></div>
                            <div className='project-li justify-content-end'><p>Status:</p><h2 className={item?.status.replace(/\s/g, '')}>{item.status}</h2></div>
                        </div>
                    </>
                }
            </div> :
            <div className='project-drop' key={item.id} style={{ padding: '10px', backgroundColor: highlighted ? '#eee' : 'transparent' }}>
                <h2>{item.project_name}</h2>
                {item?.id &&
                    <>
                        <div className='project-sub d-block'>
                            <div className='project-li w-100'><p>Customer:</p><h2>{item.customer}</h2></div>
                        </div>
                        <div className='project-sub'>
                            <div className='project-li'><p>Project Code:</p><h2>{item.project_code}</h2></div>
                            <div className='project-li justify-content-end'><p>Status:</p><h2 className={item?.status.replace(/\s/g, '')}>{item.status}</h2></div>
                        </div>
                    </>
                }
            </div>
    )


    return (
        <CInputGroup className="global-search">
            <CInputGroupText>
                <img src={SearchIcon} alt="Search" />
            </CInputGroupText>
            <Autocomplete
                items={searchData}
                getItemValue={getItemValue}
                renderItem={renderItem}
                value={query}
                onChange={handleChange}
                onSelect={value => handleSelect(value)}
                disabled={busy}
                className="global-search"
                inputProps={{ placeholder: 'Search by Project name, Project Code or Project Ref' }}
            />
            {query ? <span className="close-btn" onClick={handleResetQuery}>
                <i className="fa fa-times"></i>
            </span> : false}
        </CInputGroup>
    )
}
