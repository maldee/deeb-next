'use client';

import styles from "./grammars.module.css";
import { FaSearch } from "react-icons/fa";
import 'react-loading-skeleton/dist/skeleton.css'
import ChatbitsSkeleton from "./grammars.skeleton";

import { TailSpin } from 'react-loader-spinner';
import React, { useState, useEffect } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css'
import useSWR from "swr";
import { GoogleTagManager } from "@next/third-parties/google";
import { useCollapse } from 'react-collapsed'

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

const Grammars = ({ searchParams }) => {

  const page = parseInt(searchParams.page) || 1;

  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

  const [selectedUsage, setUsage] = useState('Select Usage')


  const [selectedFormality, setFormality] = useState('Select Formality')
  const [selectedType, setType] = useState('Select Type')
  const [selectedTense, setTense] = useState('Select Tense')
  const [selectedPlacement, setPlacement] = useState('Select Placement')

  const [query, setQuery] = useState('')

  const [postCount, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);



  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const postCount = await (
        await fetch(`/api/grammars/list?page=${currentPage}&query=${query}&usage=${selectedUsage}&formality=${selectedFormality}&type=${selectedType}&tense=${selectedTense}&placement=${selectedPlacement}`,
        )
      ).json();

      // set state when the data received
      setData(postCount);
    };

    dataFetch();
  }, [query, selectedUsage, selectedFormality, selectedType, selectedTense, selectedPlacement]);


  const { data, mutate, isLoading } = useSWR(
    `/api/grammars?page=${currentPage}&query=${query}&usage=${selectedUsage}&formality=${selectedFormality}&type=${selectedType}&tense=${selectedTense}&placement=${selectedPlacement}`,
    fetcher
  );

  const count = postCount?.count;

  const POST_PER_PAGE = 10;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

  function handleUsage(e) {
    setUsage(e.target.value)
    setFormality("Select Formality")
    setType("select Type")
    setTense("Select Tense")
    setPlacement("Select Placement")
    setQuery(null)
    setCurrentPage(1)
  }

  function handleSearch(e) {
    setQuery(e.target.value)
    setUsage('Select Usage')
    setFormality("Select Formality")
    setType("select Type")
    setTense("Select Tense")
    setPlacement("Select Placement")
    setCurrentPage(1)
  }

  function handleFormality(e) {
    setFormality(e.target.value)
    setUsage('Select Usage')
    setType("select Type")
    setTense("Select Tense")
    setPlacement("Select Placement")
    setQuery(null)
    setCurrentPage(1)
  }

  function handleType(e) {
    setType(e.target.value)
    setUsage('Select Usage')
    setFormality("Select Formality")
    setTense("Select Tense")
    setPlacement("Select Placement")
    setQuery(null)
    setCurrentPage(1)
  }

  function handleTense(e) {
    setTense(e.target.value)
    setUsage('Select Usage')
    setFormality("Select Formality")
    setType("select Type")
    setPlacement("Select Placement")
    setQuery(null)
    setCurrentPage(1)
  }

  function handlePlacement(e) {
    setPlacement(e.target.value)
    setUsage('Select Usage')
    setFormality("Select Formality")
    setType("select Type")
    setTense("Select Tense")
    setQuery(null)
    setCurrentPage(1)
  }

  function handleTag(e){
    setQuery(e.target.value)
    setUsage('Select Usage')
    setFormality("Select Formality")
    setType("select Type")
    setTense("Select Tense")
    setPlacement("Select Placement")
    setCurrentPage(1)
  }

  return (
    <div className={styles.container}>
      <GoogleTagManager gtmId="G-LFHZ053M0Z" />
      <input className={styles.searchInput} type="text" placeholder="Search grammar..." value={query} onChange={handleSearch} />

      <button className={styles.searchIcon}>
        <FaSearch />
      </button>

      <br />

      <div className={styles.mobFilters}>
        <button className={styles.filterbtn}
          {...getToggleProps({
            onClick: () => setExpanded((prevExpanded) => !prevExpanded),
          })}
        >
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
        </button>
        <section {...getCollapseProps()}>
          <select className={styles.selectInputUsage} name="usages" id="usages" onChange={handleUsage} value={selectedUsage}>
            <option value='Select Usage'>Select Usage</option>
            {isLoading ?
              <TailSpin
                height="40"
                width="40"
                color="#8a2be2"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
              : data?.usages?.map((item) => (
                <option key={item.id} value={item.usage}>{item.usage}</option>
              ))}

          </select>

          <select className={styles.selectInputFormality} name="formalities" id="formalities" onChange={handleFormality} value={selectedFormality}>
            <option value='Select Formality'>Select Formality</option>
            {isLoading ?
              <TailSpin
                height="40"
                width="40"
                color="#8a2be2"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
              : data?.formalities?.map((item) => (
                <option key={item.id} value={item.formality}>{item.formality}</option>
              ))}

          </select>

          <select className={styles.selectInputType} name="types" id="types" onChange={handleType} value={selectedType}>
            <option value='Select Type'>Select Type</option>
            {isLoading ?
              <TailSpin
                height="40"
                width="40"
                color="#8a2be2"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
              : data?.types?.map((item) => (
                <option key={item.id} value={item.type}>{item.type}</option>
              ))}

          </select>

          <select className={styles.selectInputTense} name="tenses" id="tenses" onChange={handleTense} value={selectedTense}>
            <option value='Select Tense'>Select Tense</option>
            {isLoading ?
              <TailSpin
                height="40"
                width="40"
                color="#8a2be2"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
              : data?.tenses?.map((item) => (
                <option key={item.id} value={item.tense}>{item.tense}</option>
              ))}

          </select>

          <select className={styles.selectInputPlacement} name="placements" id="placements" onChange={handlePlacement} value={selectedPlacement}>
            <option value='Select Placement'>Select Placement</option>
            {isLoading ?
              <TailSpin
                height="40"
                width="40"
                color="#8a2be2"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
              : data?.placements?.map((item) => (
                <option key={item.id} value={item.placement}>{item.placement}</option>
              ))}

          </select>
          <div className={styles.emojFilterMobile}>
          Search by
          <ul className={styles.filterEmojList}>
          <button className={styles.emojBtn} onClick={handleTag} value={`🆚`}>🆚</button>
          <button className={styles.emojBtn} onClick={handleTag} value={`*️⃣`}>*️⃣</button>
          
          </ul>
        </div>
        </section>
      </div>

      <div className={styles.webFilters}>

        <select className={styles.selectInputUsage} name="usages" id="usages" onChange={handleUsage} value={selectedUsage}>
          <option value='Select Usage'>Select Usage</option>
          {isLoading ?
            <TailSpin
              height="40"
              width="40"
              color="#8a2be2"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            : data?.usages?.map((item) => (
              <option key={item.id} value={item.usage}>{item.usage}</option>
            ))}

        </select>

        <select className={styles.selectInputFormality} name="formalities" id="formalities" onChange={handleFormality} value={selectedFormality}>
          <option value='Select Formality'>Select Formality</option>
          {isLoading ?
            <TailSpin
              height="40"
              width="40"
              color="#8a2be2"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            : data?.formalities?.map((item) => (
              <option key={item.id} value={item.formality}>{item.formality}</option>
            ))}

        </select>

        <select className={styles.selectInputType} name="types" id="types" onChange={handleType} value={selectedType}>
          <option value='Select Type'>Select Type</option>
          {isLoading ?
            <TailSpin
              height="40"
              width="40"
              color="#8a2be2"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            : data?.types?.map((item) => (
              <option key={item.id} value={item.type}>{item.type}</option>
            ))}

        </select>

        <select className={styles.selectInputTense} name="tenses" id="tenses" onChange={handleTense} value={selectedTense}>
          <option value='Select Tense'>Select Tense</option>
          {isLoading ?
            <TailSpin
              height="40"
              width="40"
              color="#8a2be2"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            : data?.tenses?.map((item) => (
              <option key={item.id} value={item.tense}>{item.tense}</option>
            ))}

        </select>

        <select className={styles.selectInputPlacement} name="placements" id="placements" onChange={handlePlacement} value={selectedPlacement}>
          <option value='Select Placement'>Select Placement</option>
          {isLoading ?
            <TailSpin
              height="40"
              width="40"
              color="#8a2be2"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            : data?.placements?.map((item) => (
              <option key={item.id} value={item.placement}>{item.placement}</option>
            ))}

        </select>

      </div>

      {postCount?.count > 0 ? (
        <ResponsivePagination
          maxWidth={`50px`}
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      ) : (null)}
      <div className={styles.gridList}>
        <div className={styles.phraseList}>
          {isLoading
            ? <ChatbitsSkeleton count={5} />
            : data?.phrases.length > 0 ? (
              data?.phrases?.map((item) => (
                <div key={item.id} className={styles.container}>
                  <ul className={styles.chatCard}>
                    <h3 key={item.id}>{item.phrase}</h3>
                    <h4 className={styles.engp}>{item.sin_p}</h4>
                    <hr className={styles.horiLine} />
                    <h4 className={styles.example}>{item.example.split('-')[0]}</h4>
                    <h4 className={styles.example}>{item.example.split('-')[1]}</h4>
                    <br />
                    <div className={styles.details}>
                      <p className={styles.tag}><span className={styles.formality}>Formality: </span> {item.formality}  </p>
                      <p className={styles.tag}><span className={styles.tense}>Tense: </span> {item.tense}  </p>
                      <p className={styles.tag}><span className={styles.type}>Type:</span> {item.type} </p>
                      <p className={styles.tag}><span className={styles.placement}>Placement: </span> {item.placement}  </p>
                      <p className={styles.tag}><span className={styles.usage}>Usage: </span> {item.usage} </p>
                      <p className={styles.tag}><span className={styles.language}>Language: </span> {item.language}</p>
                    </div>

                    {item.note != 'None' ?
                      <div>
                        <p className={styles.diff}>{'Learn more'}</p>
                        <p className={styles.diffText}>{item.note}</p>
                      </div>
                      : null
                    }
                  </ul>
                </div>

              ))) : (

              <h3 className={styles.noResults}> 🙄 No results. Try different selection</h3>
            )}


        </div>
        <div className={styles.emojTagList}>
          Tags
          <ul className={styles.tagEmojList}>
          <button className={styles.emojBtn} onClick={handleTag} value={`🆚`}>🆚</button>
          <button className={styles.emojBtn} onClick={handleTag} value={`*️⃣`}>*️⃣</button>
         
          </ul>
        </div>
      </div>
     

    </div>
  )
}

export default Grammars;