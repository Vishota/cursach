export default
class AnnouncementsQuery {
    private static readonly _sortTypes = {
        recent: 'recent',
        relevance: 'relevance',
        priceasc: 'priceasc',
        pricedesc: 'pricedesc'
    };
    public static get sortTypes() {
        return this._sortTypes;
    }

    private _limit?: number;
    private _sort: string = AnnouncementsQuery.sortTypes.recent;
    private _pricemin?: number;
    private _pricemax?: number;
    private _owner?: number;
    
    setPriceMin(v: number|undefined) : AnnouncementsQuery {
        this._pricemin = v;
        return this;
    }
    setPriceMax(v: number|undefined) : AnnouncementsQuery {
        this._pricemax = v;
        return this;
    }
    setLimit(v: number|undefined) : AnnouncementsQuery {
        this._limit = v;
        return this;
    }
    setSort(sort : string) : AnnouncementsQuery {
        this._sort = sort;
        return this;
    }
    setOwner(id: number) : AnnouncementsQuery {
        this._owner = id;
        return this;
    }

    toStringQuery() : string {
        var query = '';
        if(this._limit) query += 'limit='+this._limit + '|';
        if(this._pricemax) query += 'pricemax='+this._pricemax + '|';
        if(this._pricemin) query += 'pricemin='+this._pricemin + '|';
        if(this._owner) query += 'owner='+this._owner + '|';
        if(this._sort) query += 'sort='+this._sort;
        return query;
    }
}