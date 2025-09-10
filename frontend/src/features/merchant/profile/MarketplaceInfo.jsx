import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaLock, FaUnlock, FaEdit } from 'react-icons/fa';
import { formatDate } from '../../../utils/helpers';

const MarketplaceInfo = ({ marketplace, onUpdateDates }) => {
  const [isEditingDates, setIsEditingDates] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      openDate: marketplace?.openDate?.split('T')[0] || '',
      closeDate: marketplace?.closeDate?.split('T')[0] || '',
    },
  });

  const onSubmitDates = (data) => {
    onUpdateDates(data);
    setIsEditingDates(false);
  };

  return (
    <div className="relative p-5 bg-white/60 backdrop-blur-3xl rounded-3xl border border-white/30">
      <div className="space-y-5">
        <div className="pb-3 border-b border-white/40">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-2">
            Description
          </h3>
          <p className="text-sm text-[var(--color-richNavy)] leading-relaxed">
            {marketplace.description}
          </p>
        </div>

        <div className="pb-3 border-b border-white/40">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-2">
            Status
          </h3>
          <button
            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              marketplace.status === 'Active'
                ? 'bg-[var(--color-mellowApricot)/80] text-[var(--color-goldFoiling)] shadow-[inset_0_1px_4px_rgba(255,255,255,0.3)]'
                : 'bg-[var(--color-paleRose)/80] text-[var(--color-deepBurgundy)] shadow-[inset_0_1px_4px_rgba(255,255,255,0.3)]'
            }`}
          >
            {marketplace.status === 'Active' ? (
              <FaUnlock className="mr-2 text-xs" />
            ) : (
              <FaLock className="mr-2 text-xs" />
            )}
            {marketplace.status}
          </button>
        </div>

        {isEditingDates ? (
          <form onSubmit={handleSubmit(onSubmitDates)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-2">
                  Open Date
                </label>
                <input
                  type="date"
                  {...register('openDate')}
                  className="w-full p-2 text-xs rounded-lg border border-[var(--color-warmSand)/50] bg-white/70 focus:ring-1 focus:ring-[var(--color-goldFoiling)/30]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-2">
                  Close Date
                </label>
                <input
                  type="date"
                  {...register('closeDate')}
                  className="w-full p-2 text-xs rounded-lg border border-[var(--color-warmSand)/50] bg-white/70 focus:ring-1 focus:ring-[var(--color-goldFoiling)/30]"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setIsEditingDates(false)}
                className="px-3 py-1.5 text-xs font-medium bg-white/50 text-[var(--color-richNavy)] rounded-lg hover:bg-white/70 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-medium bg-[var(--color-goldFoiling)] text-white rounded-lg hover:bg-[var(--color-goldFoiling)/90] transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-1">
                  Open Date
                </h3>
                <p className="text-sm text-[var(--color-richNavy)]">
                  {formatDate(marketplace.openDate)}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-1">
                  Close Date
                </h3>
                <p className="text-sm text-[var(--color-richNavy)]">
                  {formatDate(marketplace.closeDate)}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditingDates(true)}
              className="text-xs text-[var(--color-goldFoiling)] hover:text-[var(--color-goldFoiling)/80] transition-colors flex items-center gap-1"
            >
              <FaEdit className="text-xs" /> Edit dates
            </button>
          </div>
        )}

        <div className="pt-2">
          <p className="text-xs text-[var(--color-mutedSlate)/90]">
            Created {formatDate(marketplace.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceInfo;