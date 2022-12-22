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
    
    setPriceMin(v: number|undefined) {
        this._pricemin = v;
        return this;
    }
    setPriceMax(v: number|undefined) {
        this._pricemax = v;
        return this;
    }
    setLimit(v: number|undefined) {
        this._limit = v;
        return this;
    }
    setSort(sort : string) {
        this._sort = sort;
        return this;
    }
    setOwner(id: number) {
        this._owner = id;
        return this;
    }

    toStringQuery() : string {
        var query = '';
        if(this._limit) query += this._limit + '|';
        if(this._sort) query += this._sort + '|';
        if(this._pricemax) query += this._pricemax + '|';
        if(this._pricemin) query += this._pricemin + '|';
        if(this._owner) query += this._owner + '|';
        if(this._sort) query += this._sort;
        return query;
    }
}