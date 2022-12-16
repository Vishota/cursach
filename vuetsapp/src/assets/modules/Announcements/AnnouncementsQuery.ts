import Announcement from './Announcement';

export default
class AnnouncementsQuery {
    private static readonly _sortTypes = {
        recent: 'recent',
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
    
    setPriceMin(v: number|undefined) {
        this._pricemin = v;
    }
    setPriceMax(v: number|undefined) {
        this._pricemax = v;
    }
    setLimit(v: number|undefined) {
        this._limit = v;
    }
    setSort(sort : string) {
        this._sort = sort;
    }
}