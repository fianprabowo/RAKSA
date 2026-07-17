-- Add device form factor to tags: bracelet (gelang), necklace (kalung),
-- or keychain (gantungan kunci). Nullable so existing rows stay unset.
ALTER TABLE wristbands
  ADD COLUMN IF NOT EXISTS device_type TEXT
    CHECK (device_type IN ('bracelet', 'necklace', 'keychain'));
