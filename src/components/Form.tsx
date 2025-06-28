import React from 'react';
import './Form.css';

interface FormData {
  missionFocus: string;
  audience: string;
  vision: string;
  values: string;
}

interface FormProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
}

export const Form: React.FC<FormProps> = ({
  formData,
  onChange,
  onSubmit,
  loading = false
}) => {
  return (
    <form 
      onSubmit={onSubmit}
      className="form"
      noValidate
    >
      <div className="form-group">
        <label htmlFor="missionFocus">
          Mission Focus
          <span aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <textarea
          id="missionFocus"
          name="missionFocus"
          value={formData.missionFocus}
          onChange={onChange}
          placeholder="What is the primary focus of your mission?"
          required
          aria-required="true"
          disabled={loading}
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="audience">
          Target Audience
          <span aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <textarea
          id="audience"
          name="audience"
          value={formData.audience}
          onChange={onChange}
          placeholder="Who is your target audience?"
          required
          aria-required="true"
          disabled={loading}
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="vision">
          Vision
          <span aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <textarea
          id="vision"
          name="vision"
          value={formData.vision}
          onChange={onChange}
          placeholder="What is your long-term vision?"
          required
          aria-required="true"
          disabled={loading}
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="values">
          Values
          <span aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <textarea
          id="values"
          name="values"
          value={formData.values}
          onChange={onChange}
          placeholder="What are your core values?"
          required
          aria-required="true"
          disabled={loading}
          rows={3}
        />
      </div>

      <div className="form-actions">
        <button 
          type="submit"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? 'Generating...' : 'Generate Mission'}
        </button>
      </div>
    </form>
  );
}; 