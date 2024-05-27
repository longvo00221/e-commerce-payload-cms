'use client'

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import qs from 'qs'

import { Product } from '../../../payload/payload-types'
import type { ArchiveBlockProps } from '../../_blocks/ArchiveBlock/types'
import { useFilter } from '../../_providers/Filter'
import { Card } from '../Card'
import { PageRange } from '../PageRange'
import { Pagination } from '../Pagination'

import classes from './index.module.scss'
import Loader from '../Loading'

type Result = {
  totalDocs: number
  docs: Product[]
  page: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
  nextPage: number
  prevPage: number
}

export type Props = {
  className?: string
  relationTo?: 'products'
  populateBy?: 'collection' | 'selection'
  showPageRange?: boolean
  onResultChange?: (result: Result) => void // eslint-disable-line no-unused-vars
  limit?: number
  populatedDocs?: ArchiveBlockProps['populatedDocs']
  populatedDocsTotal?: ArchiveBlockProps['populatedDocsTotal']
  categories?: ArchiveBlockProps['categories']
  infiniteScroll?: boolean
}

export const CollectionArchive: React.FC<Props> = props => {
  const { categoryFilters, sort } = useFilter()

  const {
    className,
    relationTo,
    showPageRange,
    onResultChange,
    limit = 10,
    populatedDocs,
    populatedDocsTotal,
    infiniteScroll = false,
  } = props

  const [results, setResults] = useState<Result>({
    totalDocs: typeof populatedDocsTotal === 'number' ? populatedDocsTotal : 0,
    docs: (populatedDocs?.map(doc => doc.value) || []) as [],
    page: 1,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: 1,
    nextPage: 1,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const observerRef = useRef<HTMLDivElement | null>(null)
  const [page, setPage] = useState(1)

  const fetchMoreData = useCallback(async (reset = false) => {
    const searchQuery = qs.stringify(
      {
        sort,
        where: {
          ...(categoryFilters && categoryFilters?.length > 0
            ? {
                categories: {
                  in:
                    typeof categoryFilters === 'string'
                      ? [categoryFilters]
                      : categoryFilters.map((cat: string) => cat).join(','),
                },
              }
            : {}),
        },
        limit,
        page,
        depth: 1,
      },
      { encode: false },
    )

    try {
      setIsLoading(true)
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${relationTo}?${searchQuery}`,
      )
      const json = await req.json()
      const { docs, totalDocs, totalPages, hasNextPage, nextPage } = json as Result

      setResults(prevResults => ({
        ...prevResults,
        docs: reset ? docs : [...prevResults.docs, ...docs],
        totalDocs,
        totalPages,
        hasNextPage,
        nextPage,
      }))
      setIsLoading(false)
      if (typeof onResultChange === 'function') {
        onResultChange(json)
      }
    } catch (err) {
      console.warn(err) // eslint-disable-line no-console
      setIsLoading(false)
      setError(`Unable to load "${relationTo} archive" data at this time.`)
    }
  }, [page, categoryFilters, relationTo, onResultChange, sort, limit, infiniteScroll])

  useEffect(() => {
    if (infiniteScroll) {
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && results.hasNextPage && !isLoading) {
            setPage(prevPage => prevPage + 1)
          }
        },
        { threshold: 1.0 }
      )

      if (observerRef.current) {
        observer.observe(observerRef.current)
      }

      return () => {
        if (observerRef.current) {
          observer.unobserve(observerRef.current)
        }
      }
    }
  }, [results.hasNextPage, isLoading, infiniteScroll])

  useEffect(() => {
    fetchMoreData(page === 1)
  }, [page, fetchMoreData])

  useEffect(() => {
    setPage(1)
    setResults(prevResults => ({
      ...prevResults,
      docs: [],
    }))
  }, [categoryFilters, sort])

  return (
    <div className={[classes.collectionArchive, className].filter(Boolean).join(' ')}>
      {!isLoading && error && <div>{error}</div>}
      <Fragment>
        {showPageRange !== false && !infiniteScroll && (
          <div className={classes.pageRange}>
            <PageRange
              totalDocs={results.totalDocs}
              currentPage={results.page}
              collection={relationTo}
              limit={limit}
            />
          </div>
        )}

        <div className={classes.grid}>
          {results.docs?.map((result, index) => {
            return <Card key={index} relationTo="products" doc={result} showCategories />
          })}
        </div>

        {infiniteScroll ? (
          <div ref={observerRef} className={classes.observerRef} />
        ) : (
          results.totalPages > 1 && (
            <Pagination
              className={classes.pagination}
              page={results.page}
              totalPages={results.totalPages}
              onClick={setPage}
            />
          )
        )}
        {isLoading && <div><Loader/></div>}
      </Fragment>
    </div>
  )
}
