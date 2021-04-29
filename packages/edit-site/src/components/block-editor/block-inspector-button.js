/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { speak } from '@wordpress/a11y';
import { MenuItem } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as interfaceStore } from '@wordpress/interface';
import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../store';
import { SIDEBAR_BLOCK } from '../sidebar/constants';

export default function BlockInspectorButton( { onClick = () => {} } ) {
	const { shortcut, isBlockInspectorOpen } = useSelect(
		( select ) => ( {
			// shortcut: select(
			// 	keyboardShortcutsStore
			// ).getShortcutRepresentation( 'core/edit-site/toggle-sidebar' ),
			isBlockInspectorOpen:
				select( interfaceStore ).getActiveComplementaryArea(
					editSiteStore.name
				) === SIDEBAR_BLOCK,
		} ),
		[]
	);
	const { enableComplementaryArea, disableComplementaryArea } = useDispatch(
		interfaceStore
	);

	const speakMessage = () => {
		if ( isBlockInspectorOpen ) {
			speak( __( 'Block settings closed' ) );
		} else {
			speak(
				__(
					'Additional settings are now available in the Editor block settings sidebar'
				)
			);
		}
	};

	const label = isBlockInspectorOpen
		? __( 'Hide more settings' )
		: __( 'Show more settings' );

	return (
		<MenuItem
			onClick={ () => {
				if ( isBlockInspectorOpen ) {
					disableComplementaryArea( 'core/edit-site' );
				} else {
					enableComplementaryArea(
						'core/edit-site',
						'edit-site/block-inspector'
					);
					speakMessage();
				}
				// Close dropdown menu.
				onClick();
			} }
			shortcut={ shortcut }
		>
			{ label }
		</MenuItem>
	);
}
