/*
    Firefox addon "Update Notifier"
    Copyright (C) 2024  Manuel Reimer <manuel.reimer@gmx.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

async function init() {
  // Get the version of the currently running browser
  const info = await browser.runtime.getBrowserInfo();
  const localVersion = info.version;
  document.getElementById("local_version").textContent = localVersion;

  // Check version
  if (await VersionChecker.isUpToDate()) {
    document.getElementById("img_ok").classList.remove("hidden");
    document.getElementById("remote_version").textContent = localVersion;
  }
  else {
    if (VersionChecker.error) {
      alert(VersionChecker.error);
      document.getElementById("img_error").classList.remove("hidden");
    }
    else {
      document.getElementById("img_warning").classList.remove("hidden");
      document.getElementById("remote_version").textContent = VersionChecker.remoteVersion.join(", ");
      document.getElementById("info_links").classList.remove("hidden");
    }
  }
}

init();
